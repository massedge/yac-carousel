import Core from '../../../../classes/core'
import EventableMixin from '../../../eventable/mitt'
import FocusableMixin from '../../../focusable'

import SelectOnFocusedItemItemizableMixin from '..'
import ItemizableCoreMixin from '../../core'
import SelectIndexableMixin, {
  IndexableSelectMixinEventMap,
} from '../../../indexable/select'

test('itemizable prevent-scroll mixin', () => {
  const ItemCls = FocusableMixin(EventableMixin(Core))

  const ContainerBaseCls = EventableMixin(Core)
  const ContainerCls = SelectOnFocusedItemItemizableMixin(
    SelectIndexableMixin(ItemizableCoreMixin(ContainerBaseCls, ItemCls))
  )

  const selectCallback = jest.fn(
    (e: IndexableSelectMixinEventMap['yac:select:after']) => e.detail.to
  )
  const container = new ContainerCls({
    items: [new ItemCls({}), new ItemCls({}), new ItemCls({})],
  })
  container.on('yac:select:after', selectCallback)
  container.render()

  selectCallback.mockClear()
  container.items[1].focus()
  expect(selectCallback).toHaveReturnedWith(1)

  selectCallback.mockClear()
  container.items[1].blur()
  expect(selectCallback).not.toHaveBeenCalled()
})
