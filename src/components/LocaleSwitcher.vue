<template>
  <select @change="switchLocale($event)">
    <option
      v-for="locale in locales"
      :key="locale"
      :value="locale"
      :selected="locale == $i18n.locale"
    >
      {{ uppercaseLocale(locale) }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LocaleSwitcher",
  data() {
    return {
      locales: import.meta.env.VITE_MULTILINGUAL_SUPPORTED_LOCALE.split(","),
    };
  },
  methods: {
    uppercaseLocale(locale: string) {
      return locale.toUpperCase();
    },
    switchLocale(event: Event) {
      const element = event.target as HTMLInputElement;
      const locale = element.value;

      if (this.$i18n.locale !== locale) {
        this.$i18n.locale = locale;

        if (import.meta.env.VITE_HAS_MULTILINGUAL_URL === 'true') {
          const to = this.$router.resolve({ params: { locale } });
          this.$router.push({
            name: to.name as string,
            params: to.params,
          });
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
select {
  position: absolute;
  top: 20px;
  right: 20px;
  -webkit-appearance: none;
  padding: 12px 20px 12px 4px;
  font-family: sans-serif;
  font-size: 16px;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  text-transform: uppercase;

  background-image: url("../assets/images/icons/icon_dropdown.svg");
  background-repeat: no-repeat;
  background-position: right center;
  transition: opacity 0.4s ease-out;

  @include desktop-up {
    &:hover {
      opacity: 0.8;
    }
  }

  option {
    text-transform: uppercase;
    padding: 8px;
    color: #000;
  }
}
</style>
