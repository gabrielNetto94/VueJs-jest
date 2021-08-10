import Avaliador from '@/views/Avaliador'
//routerLinkStub dependencia que simula o routerLink
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
    {
        produto: 'Livro ',
        lanceInicial: 50,
        descricao: 'Livro loco'
    },
    {
        produto: 'Livro 2',
        lanceInicial: 32,
        descricao: 'Livro muito loco'
    },
]

describe('Avaliador que se conector com a api', () => {
    test('mostra todos os leiloes retornados pela API', async () => {

        getLeiloes.mockResolvedValueOnce(leiloes)
        const wrapper = mount(Avaliador, {
            stubs: {
                //informa que no routerLink será utilizado um simulador 
                RouterLink: RouterLinkStub
            }
        })

        await flushPromises()

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(leiloes.length)

    })
    test('Não há leiloes retornados pela API', async () => {

        getLeiloes.mockResolvedValueOnce([])
        const wrapper = mount(Avaliador, {
            stubs: {
                //informa que no routerLink será utilizado um simulador 
                RouterLink: RouterLinkStub
            }
        })

        await flushPromises()

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(0)

    })
})