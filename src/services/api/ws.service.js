import { SubscriptionClient } from 'graphql-subscriptions-client'

class WSService {
  constructor() {
    this.client = null
  }

  createClient() {
    this.client = new SubscriptionClient(this.url, {
      reconnect: true,
      lazy: true, // only connect when there is a query
    })
    return this.client
  }

  create() {
    if (this.client) {
      this.client.close(true)
    }
    this.createClient()
  }
}

export default new WSService()
