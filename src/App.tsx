import { useEffect, useState, useCallback } from 'react'
import Header from './components/Header'
import ProdutosComponent from './containers/Produtos'
import { GlobalStyle } from './styles'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [carrinho, setCarrinho] = useState<Produto[]>([])
  const [favoritos, setFavoritos] = useState<Produto[]>([])

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch(
          'https://fake-api-tau.vercel.app/api/ebac_sports'
        )
        if (!response.ok) {
          throw new Error('Erro ao carregar produtos')
        }
        const data = await response.json()
        setProdutos(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProdutos()
  }, [])

  const adicionarAoCarrinho = useCallback(
    (produto: Produto) => {
      if (carrinho.find((p) => p.id === produto.id)) {
        alert('Item já adicionado')
      } else {
        setCarrinho((prev) => [...prev, produto])
      }
    },
    [carrinho]
  )

  const favoritar = useCallback((produto: Produto) => {
    setFavoritos((prev) => {
      if (prev.find((p) => p.id === produto.id)) {
        return prev.filter((p) => p.id !== produto.id)
      } else {
        return [...prev, produto]
      }
    })
  }, [])

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <ProdutosComponent
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
