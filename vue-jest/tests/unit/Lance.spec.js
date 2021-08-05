import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'
describe('Um Lance sem valor mínimo', () => {
    test('não aceita lance com valor menor do que 0', () => {
        //monta o componente Lance
        const wrapper = mount(Lance)
        //busca o input
        const input = wrapper.find('input')
        //seta um valor inválido
        input.setValue(-100)
        //ativar submição do formulário
        wrapper.trigger('submit')
        //captura os lances emitidos
        const lancesEmitidos = wrapper.emitted('novo-lance')
        //espera que os lances emitidos sejam undefined
        expect(lancesEmitidos).toBeUndefined()
    })
    test('emite um lance quando o valor é maior do que 0', () => {
        const wrapper = mount(Lance)
        const input = wrapper.find('input')
        input.setValue(100)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        expect(lancesEmitidos).toHaveLength(1)
    })
    test('emite o valor esperado de um lance válido', () => {
        const wrapper = mount(Lance)
        const input = wrapper.find('input')
        input.setValue(100)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        // [
        //     [ 100 ]
        // ]
        const lance = parseInt(lancesEmitidos[0][0])
        expect(lance).toBe(100)
    })
})