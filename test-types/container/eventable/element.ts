import {ContainerEventableElement, ContainerElementable, ContainerCore} from '../../../src'

const Eventable = 
  ContainerEventableElement (
  ContainerElementable(
    ContainerCore
  ))

const Eventable2 = ContainerEventableElement(ContainerCore) // $ExpectError
