import Leilao from '@/components/Leilao'
import { mount } from '@vue/test-utils'

const leilao = {
    produto: 'Um livro de casa do código',
    lanceInicial: 49,
    descricao: 'O livro é legal'
}

describe('Um leilao exive os dados do produto', () => {
    test('Exeibe os dados do leilao no card', () => {

        //monta o componente leilao passando as propriedades
        const wrapper = mount(Leilao, {
            propsData: {
                leilao
            }
        })

        const header = wrapper.find(".card-header").element
        const title = wrapper.find(".card-title").element
        const text = wrapper.find(".card-text").element

        expect(header.textContent).toContain(`Estamos leiloando um(a): ${leilao.produto}`)
        expect(title.textContent).toContain(`Lance inicial: R$ ${leilao.lanceInicial}`)
        expect(text.textContent).toContain(`${leilao.descricao}`)

        expect(wrapper).toBeTruthy()
    })
})