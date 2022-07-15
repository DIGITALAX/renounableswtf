import { createModule } from 'redux-modules'
import cloneDeep from 'lodash.clonedeep'
import { List, Map } from 'immutable'
import TransformModules from '../utils/transform-modules'

const DEFAULT_FIELDS = Map({
  isInitialized: false,
  chainId: null,
  allUsers: List([])
})

export default createModule({
  name: 'global',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: cloneDeep(TransformModules(DEFAULT_FIELDS))
})
