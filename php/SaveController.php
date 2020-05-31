<?php
App::uses('AppController', 'Controller');

/**
 * Class SaveController
 *
 */
class SaveController extends AppController
{
  public $components = array();
  public $helpers = array();
  public $uses = array();
  
  public $put_dir = WWW_ROOT . 'json/';
  
  
  /**
  * TOP
  *
  * @return void
  */
  public function index() {
    $this->setting();
    echo '<meta charset="utf-8">';
    
  }
  
  
  public function put_totals () {
    $this->setting();
    
    $api = $this->get_api('https://covid-19-data.p.rapidapi.com/totals?format=undefined');
    
    $dir = 'totals/';
    $file = 'totals.json';
    file_put_contents($this->put_dir. $dir. $file, $api);
  }
  
  
  public function put_summary () {
    $this->setting();
    
    $api = $this->get_api('https://covid-19-data.p.rapidapi.com/totals?format=undefined');
    
    $dir = 'summary/';
    $file = 'summary.json';
    file_put_contents($this->put_dir. $dir. $file, $api);
  }
  
  
  public function put_countries () {
    $this->setting();
    
    $api = $this->get_api('https://covid-19-data.p.rapidapi.com/help/countries?format=undefined');
    $dir = 'countries/';
    $file = 'countries.json';
    file_put_contents($this->put_dir. $dir. $file, $api);
  }
  
  
  public function put_country_all () {
    $this->setting();
    
    $countries = json_decode(file_get_contents($this->put_dir. 'countries/countries.json'), true);
    $period = $this->get_date_array('2020-01-22');
    foreach ($countries as $row) {
      foreach ($period as $row2) {
        $api = $this->get_api('https://covid-19-data.p.rapidapi.com/report/country/code?format=undefined&date-format=undefined&date=' . $row2 . '&code=' . mb_strtolower($row['alpha2code']));
        $dir = 'country/';
        $file = mb_strtolower($row['alpha2code']). '_'. $row2. '.json';
        file_put_contents($this->put_dir. $dir. $file, $api);
      }
    }
  }
  
  
  public function put_country_date ($date) {
    $this->setting();
    
    $countries = json_decode(file_get_contents($this->put_dir. 'countries/countries.json'), true);
    foreach ($countries as $row) {
      $api = $this->get_api('https://covid-19-data.p.rapidapi.com/report/country/code?format=undefined&date-format=undefined&date='. $date. '&code='. mb_strtolower($row['alpha2code']));
      $file = mb_strtolower($row['alpha2code']). '_' . $date. '.json';
      file_put_contents($this->put_dir . 'country/' . $file, $api);
    }
  }
  
  
  public function create_detail () {
    $this->setting();
  
    $countries = json_decode(file_get_contents($this->put_dir. 'countries/countries.json'), true);
    $period = $this->get_date_array('2020-01-22');
    foreach ($countries as $row) {
      $country_code = mb_strtolower($row['alpha2code']);
      if (empty($country_code)) {
        continue;
      }
      $array = array();
      $key = 0;
      foreach ($period as $key2 => $row2) {
        $url = $this->put_dir . 'country/' . $country_code . '_' . $row2 . '.json';
        if (is_file($url)) {
          $json = file_get_contents($url);
          $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
          $json = json_decode($json, true);
          if (!isset($json[0]['provinces'][0]['confirmed'])) {
            continue;
          }
          $total['confirmed'] = 0;
          $total['recovered'] = 0;
          $total['deaths'] = 0;
          $total['active'] = 0;
          foreach ($json[0]['provinces'] as $key3 => $row3) {
            $total['confirmed'] += $row3['confirmed'];
            $total['recovered'] += $row3['recovered'];
            $total['deaths'] += $row3['deaths'];
            $total['active'] += $row3['active'];
          }
          $array[$key] = $json[0];
          $array[$key]['total'] = $total;
          $array[$key]['code'] = $country_code;
          $key ++;
        }
      }
      file_put_contents($this->put_dir. 'create_detail/'. $country_code. '.json', json_encode($array));
    }
  }
  
  
  public function create_index () {
    $this->setting();
  
    $files = glob($this->put_dir . 'create_detail/' . '*.json');
    $array = array();
    foreach ($files as $row) {
      $json = file_get_contents($row);
      $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
      $json = json_decode($json, true);
      $json = array_reverse($json);
      if(isset($json[0])) {
        $array[] = $json[0];
      }
    }
    file_put_contents($this->put_dir. 'create_index/'. 'json.json', json_encode($array));
  }
  
  
  private function setting () {
    ini_set("max_execution_time", 10000);
    ini_set("memory_limit", '1024M');
    $this->autoRender = false;
  }
  
  
  private function get_api ($url) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_HTTPHEADER => array(
        API_HOST,
        API_KEY
      ),
    ));
  
    $response = curl_exec($curl);
    $err = curl_error($curl);
  
    curl_close($curl);
  
    if ($err) {
      return '';
    } else {
      return $response;
    }
  }
  
  
  private function get_date_array ($start) {
    $startDate = date($start);
    $endDate = date('Y-m-d', strtotime('now'));
    $diff = (strtotime($endDate) - strtotime($startDate)) / ( 60 * 60 * 24);
    $period = array();
    for($i = 0; $i <= $diff; $i++) {
      $period[] = date('Y-m-d', strtotime($startDate . '+' . $i . 'days'));
    }
    return $period;
  }
  
}
