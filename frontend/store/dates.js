import { createListModule, singleUrl } from './listFactory'

export default createListModule(singleUrl('/api/dates/'), {
  dateFields: ['birthday'],
})
