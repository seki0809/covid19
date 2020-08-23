<template>
  <div class="c-summary">
    <div class="l-wrapper">
      <div class="c-box c-summary__box">
        <div class="row">
          <div v-for="row in item" class="col-3 c-summary__column">
            <h2 class="c-summary__text">{{ row.text }}</h2>
            <p v-show="loading" class="c-summary__number">{{ numberFormat(row.number) }}<span class="c-summary__people">人</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        required: true,
        type: Array,
        default: () => {
          return []
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/var';

  .c-summary {
    padding: 20px 0;
    @include pc {
      height: 190px;
      padding: 40px;
    }
    &__title {
      margin-bottom: 5px;
      font-size: 2.0rem;
      color: $white;
      @include pc {
        font-size: 2.6rem;
      }
    }
    &__box {
      padding: 16px;
      @include pc {
        padding: 20px;
      }
    }
    &__column {
      height: 40px;
      padding-bottom: 10px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      line-height: 1;
      &:last-child {
        padding-bottom: 0;
        border: none;
      }
      @include pc {
        height: 60px;
        padding-bottom: 0;
        display: block;
      }
    }
    &__text {
      font-size: 1.8rem;
      @include pc {
        margin-bottom: 15px;
        text-align: center;
      }
    }
    &__number {
      font-size: 3.0rem;
      @include pc {
        text-align: center;
      }
    }
    &__people {
      font-size: 1.2rem;
    }
  }
</style>
