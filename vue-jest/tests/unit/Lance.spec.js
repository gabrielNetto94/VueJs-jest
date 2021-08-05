//importa o componente que deseja testar
import Lance from '@/components/Lance.vue';
//utilizado para montar o componente
import { mount } from '@vue/test-utils';

test('não aceita lanco com valor menor do que zero', () => {
    //monta o componente Lance
    const wrapper = mount(Lance);
    //busca o input
    const input = wrapper.find('input');
    //seta um valor inválido
    input.setValue(-100);
    //escuta o evento novo-lance
    const lancesEmitidos = wrapper.emitted('novo-lance');
    //ativar submição do formulário
    wrapper.trigger('submit');
    //espera que os lances emitidos sejam undefined
    expect(lancesEmitidos).toBeUndefined();
})

test('emite lance quando valor maior que zero'), () => {
    //monta o componente Lance
    const wrapper = mount(Lance);
    //busca o input
    const input = wrapper.find('input');
    //seta um valor inválido
    input.setValue(100);
    //escuta o evento novo-lance
    const lancesEmitidos = wrapper.emitted('novo-lance');
    //ativar submição do formulário
    wrapper.trigger('submit');
    //espera que os lances emitidos tanham tamahno 1
    expect(lancesEmitidos).toHaveLength(1);
})