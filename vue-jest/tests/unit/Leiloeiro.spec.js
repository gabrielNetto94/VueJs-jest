import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
//biblioteca para aguardar os métodos assincronos serem executados
import flushPromises from 'flush-promises'

//monta os métodos http 
jest.mock('@/http')

//cria um retorno ficticio para o método getLeilao
const leilao = {
    produto: 'Um livro',
    lanceInicial: 32,
    descricao: 'Livro legal'
}

const lances = [
    {
        id: 1,
        valor: 1001,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1
    },
    {
        id: 2,
        valor: 1006,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1
    },
    {
        id: 3,
        valor: 1000,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1
    },
]

describe('Leiloeiro inicia um leilao que não possui lances', () => {
    test('avisa quando não existem lances', async () => {

        //simula o retorno do método http getLeilao
        getLeilao.mockResolvedValueOnce(leilao)
        //simula o retorno do método http getLances no caso retornando um array vazio
        getLances.mockResolvedValueOnce([
            // {
            //     id: 1,
            //     valor: 22,
            //     data: '2020-10-02',
            //     leilao_id: 1
            // }
        ])

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        //chama o método para aguardar os async serem executados
        await flushPromises()

        //exibe o alerta se não existir lances
        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBe(true)
    })
})

describe('Um leiloeiro exibe os lances existentes', () => {
    test('Não mostra o aviso de "sem lances"', async () => {

        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })
        await flushPromises()
        //busca o elemento
        const alerta = wrapper.find('.alert-dark')
        //teste se existe e espera que seja falso
        expect(alerta.exists()).toBe(false);

    })
    test('Possui uma lista de lances', async () => {

        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })
        await flushPromises()

        const lista = wrapper.find('.list-inline')
        //garante que a lista de lances existe
        expect(lista.exists()).toBe(true);


    })

})

describe('Um leiloeiro comunica os valores de menor e maior lance', () => {
    test('Mostra o maior lance', async () => {

        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })
        await flushPromises()

        const maiorLance = wrapper.find('.maior-lance')
        expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1006')
        
    })
    
    test('Mostra o menor lance', async () => {
        
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })
        await flushPromises()
        
        const menorLance = wrapper.find('.menor-lance')
        expect(menorLance.element.textContent).toContain('Menor lance: R$ 1000')
    })
})