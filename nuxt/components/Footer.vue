<template>
  <footer class="footer">
    <div class="l-wrapper">
      <p>データはRakuten RapidAPIより取得したデータになります。<br>
        <a href="https://api.rakuten.net/api-sports/api/covid-193/details" target="_blank">https://api.rakuten.net/api-sports/api/covid-193/detaiils</a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  @import '../assets/css/var';

  .footer {
    padding: 20px 0;
    background: $white;
    a {
      text-decoration: underline;
    }
  }
</style>
