export default {
  name: 'LexascmsCollectionMixin',

  props: {
    contentType: {
      type: String,
      required: true
    },
    fields: {
      type: Object
    },
    filter: {
      type: Object
    },
    localeCode: {
      type: String
    },
    page: {
      type: Object
    },
    sort: {
      type: String
    }
  },

  computed: {
    collection () {
      // Get collection
      const collection = this.$store.getters['vsf-lexascms/data'](
        JSON.stringify(this.buildRequestArgs())
      );
      // Return empty array if undefined
      if (collection === undefined) {
        return [];
      }
      // Return
      return collection;
    }
  },

  serverPrefetch () {
    return this.fetchCollection();
  },

  mounted () {
    if (this.collection.length === 0) {
      this.fetchCollection();
    }
  },

  methods: {
    fetchCollection () {
      return this.$store.dispatch('vsf-lexascms/getData', this.buildRequestArgs());
    },

    buildRequestArgs () {
      return {
        path: `/${this.contentType}`,
        params: {
          fields: this.fields !== undefined ? this.fields : undefined,
          filter: this.filter !== undefined ? this.filter : undefined,
          localeCode: this.localeCode !== undefined ? this.localeCode : undefined,
          page: this.page !== undefined ? this.page : undefined,
          sort: this.sort !== undefined ? this.sort : undefined
        }
      };
    }
  }
}
