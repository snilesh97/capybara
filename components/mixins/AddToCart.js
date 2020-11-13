import { notifications } from '@vue-storefront/core/modules/cart/helpers';

export default {
  data () {
    return {
      isProductDisabled: false
    }
  },
  methods: {
    async addToCart (product) {
      this.isProductDisabled = true;
      try {
        const diffLog = await this.$store.dispatch('cart/addItem', {
          productToAdd: Object.assign({}, product, { qty: 1 })
        });
        diffLog.clientNotifications.forEach(notificationData => {
          this.$store.dispatch(
            'notification/spawnNotification',
            notificationData,
            { root: true }
          );
        });
      } catch (message) {
        this.$store.dispatch(
          'notification/spawnNotification',
          notifications.createNotification({ type: 'danger', message }),
          { root: true }
        );
      }
      this.isProductDisabled = false;
    }
  }
}
