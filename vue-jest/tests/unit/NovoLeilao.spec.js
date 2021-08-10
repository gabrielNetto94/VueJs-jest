import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'

jest.mock('@/http')

//diz pro jest simular a função push, no caso ele vai criar uma função para simular
const $router = {
    push: jest.fn()
}

describe('Um novo leilao deve ser criado', () => {

    test('dado o formulário preenchido, um novo leilao deve ser criado', () => {
        createLeilao.mockResolvedValueOnce()

        //monta componente com o método $router simulado pelo jest
        const wrapper = mount(NovoLeilao,{
            mocks:{
                $router
            }
        })

        //seta os valores dos inputs
        wrapper.find('.produto').setValue('Caderno')
        wrapper.find('.descricao').setValue('Caderno do batman')
        wrapper.find('.valor').setValue(29)
        //envia formulário
        wrapper.find('form').trigger('submit')
        
        //espera que o método createLeilao tenha sido chamado
        expect(createLeilao).toHaveBeenCalled()

    })
})