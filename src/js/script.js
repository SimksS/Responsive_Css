const ul = document.querySelector('.containerListaProdutos ul');
shopInit()
function shopInit (){
   const listaProdutos = produtos
   montarListaProdutos(listaProdutos)
}

function montarListaProdutos(listaprodutos) {
    ul.innerHTML = ""
    listaprodutos.forEach((produto) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const ol = document.createElement("ol")
        const downSection = document.createElement("section")
        const p = document.createElement('p');
        const span = document.createElement('span');
        const button = document.createElement("button")
       
        // Adicionando dados do produto aos elementos
        
        img.src = produto.img;
        img.alt = produto.nome;
        h3.innerText = produto.nome;
        p.innerText = "R$ " + produto.preco;
        span.innerText = produto.secao;
        button.innerText = "Comprar"
        button.setAttribute("class","addCart")

        p.setAttribute("class","price-value")

        // Adicionando o elementos para o li
        li.appendChild(img);
        li.appendChild(h3);
        li.appendChild(span);
        li.append(ol);
        for(let i = 0 ; i < produto.componentes.length; i++){
            let comLi = document.createElement("li")
            comLi.appendChild(document.createTextNode(produto.componentes[i]))
            ol.append(comLi)
        }
        
        li.appendChild(downSection)
        downSection.appendChild(p);
        downSection.appendChild(button)
        

        // Adicionando li ao HTML
        ul.appendChild(li);
        ready()
    });
}

function ready (){
    const botaoMostrarCategoria = document.querySelectorAll('.estiloGeralBotoes--filtrarProdutos')
    for (let i = 0 ; i < botaoMostrarCategoria.length; i++){
        let categoria = botaoMostrarCategoria[i]
        categoria.addEventListener('click', filtrarPorCategoria);
    }
    
    const botaoMostrarTodos = document.querySelector('.mostrarTodos')
    botaoMostrarTodos.addEventListener('click', shopInit);
    
    const filtrarPesquisa  = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")
    filtrarPesquisa.addEventListener("click",filtrarPorNome)

    const addCart = document.querySelectorAll(".addCart")
    for (let i = 0 ; i < addCart.length; i++){
        let addItem = addCart[i]
        addItem.addEventListener("click", adicionarCarrinho)
    }
    
    const remove = document.querySelectorAll('.cart-remove')
    for(let i = 0 ; i < remove.length ; i++){
        let removeItem = remove[i]
        removeItem.addEventListener("click",removerCarrinho)
    }
}

function adicionarCarrinho(event){
    let targetItem = event.target
    let parentItem = targetItem.parentNode
    let produto = parentItem.parentNode
    let imageProduct = produto.querySelector("img").src
    let nomeProduct = produto.querySelector("h3").innerText
    let sectionProduct = produto.querySelector("span").innerText
    let productPrice = produto.querySelector(".price-value").innerText

    let objProduto = {image:imageProduct ,nome:nomeProduct, 
        categoria: sectionProduct, preco:productPrice}
    
    addCart(objProduto)
    
    
}

function addCart(produto){
    const produtosCarrinho = document.querySelectorAll(".product-title")
    let contador = 0
    let produtoAlterar = document.querySelector(".product-title")
    if (produtosCarrinho.length > 0){
        for(let i = 0 ; i < produtosCarrinho .length ; i++){
            let = produtoName = produtosCarrinho [i].innerText
            if(produtoName === produto.nome){
                contador += 1
                produtoAlterar = produtosCarrinho[i].parentNode
            }

        }
    }
    if(contador > 0){
        let precoAtual = produtoAlterar.querySelector(".cart-price").innerText.replace("R$ ",'')
        let nomeProduto = produtoAlterar.querySelector(".product-title").innerText
        let precoMonetarioAtual = parseFloat(precoAtual)
        let PrecoOriginal = produtos.filter((item)=>item.nome == nomeProduto)
        produtoAlterar.querySelector(".cart-price").innerText = "R$ " + 
        (precoMonetarioAtual + parseFloat(PrecoOriginal[0].preco)).toFixed(2) + "(" + (1 + (parseFloat(precoAtual)/parseFloat(PrecoOriginal[0].preco))) + ")"
    }   
    else {
        let productCart = document.createElement("div")
        let product = document.createElement("div")
        let producImage = document.createElement("img")
        let productList = document.createElement("ul")
        let liTitle = document.createElement("li")
        let liSection = document.createElement("li")
        let liPrice = document.createElement("li")
        let removeCart = document.createElement("button")
        let removeImg = document.createElement("img")

        productCart.setAttribute("class","product-cart")
        product.setAttribute("class","product")
        producImage.setAttribute("class","cart-image-product")
        productList.setAttribute("class","product-description")
        liTitle.setAttribute("class","product-title")
        liSection.setAttribute("class","product-section")
        liPrice.setAttribute("class","cart-price")
        removeCart.setAttribute("class","cart-remove")
        removeImg.setAttribute("src","src/img/trash.png")

        liTitle.innerText = produto.nome
        producImage.src = produto.image
        liSection.innerText = produto.categoria
        liPrice.innerText = produto.preco

        productCart.appendChild(product)
        product.appendChild(producImage)
        productList.appendChild(liTitle)
        productList.appendChild(liSection)
        productList.appendChild(liPrice)
        product.appendChild(productList)
        removeCart.appendChild(removeImg)
        product.appendChild(removeCart)
        
        document.querySelector(".cart-item").appendChild(productCart)
        

    }
        let checkoutPlace = document.querySelector(".cart-checkout")
        let noItens = document.querySelector(".no-itens")
        checkoutPlace.classList.remove("empty-cart")
        noItens.classList.add("empty-cart")
        atualizaQuantidade()
        atualizarTotal()
        ready()
}

function removerCarrinho(event){
    let eventTarget = event.target
    let button = eventTarget.parentNode
    let produto = button.parentNode
    produto.parentNode.remove()
    
    atualizarTotal()
    atualizaQuantidade()
}

function atualizarTotal (){
    const preco = document.querySelectorAll(".cart-price")
    let finalPrice  = 0 
    preco.forEach((preco) =>{
        let soma = preco.innerText
        finalPrice += parseFloat(soma.replace("R$ ", ""))
    })
    document.querySelector("#precoTotal").innerHTML = "R$ " + finalPrice.toFixed(2).replace(".",",")
}

function atualizaQuantidade (){
    let itemsCarrinho = document.querySelectorAll(".product-description")
    let contador = 0
    for (let i = 0 ; i < itemsCarrinho.length; i++){
        let itemCarrinho = itemsCarrinho[i]
        let nameProduct = itemCarrinho.querySelector(".product-title").innerText
        let priceProduct = parseFloat(itemCarrinho.querySelector(".cart-price").innerText.replace("R$ ", ""))
        let filtro = produtos.filter((item)=> item.nome === nameProduct)
        contador += priceProduct / parseFloat(filtro[0].preco) 
    }
    document.querySelector("#quantidadeTotal").innerText = contador
    let quantityValue = document.querySelector("#quantidadeTotal").innerText
    if(parseInt(quantityValue) == 0){
        let checkoutPlace = document.querySelector(".cart-checkout")
        checkoutPlace.classList.add("empty-cart")
        let noItens = document.querySelector(".no-itens")
        noItens.classList.remove("empty-cart")
       
    }
}

function filtrarPorNome (){
    let inputReader = document.querySelector(".campoBuscaPorNome").value
    let filtro = produtos.filter((item)=> item.nome.toLowerCase() === inputReader.toLowerCase() || item.categoria.toLowerCase() === inputReader.toLowerCase() || item.secao.toLowerCase() === inputReader.toLowerCase())
    montarListaProdutos(filtro)

}

function filtrarPorCategoria(event) {

    let styleRemove = document.getElementsByClassName("estiloGeralBotoes")
    for (let i = 0 ; i < styleRemove.length ; i++){
       if(styleRemove[i].classList.contains("active") == true){
            let remove = styleRemove[i]
           remove.classList.remove("active")
       }
    }
    let pointClicked = event.target
    pointClicked.classList.add("active")
    let namePoint = pointClicked.innerText
    const listaCategoria = produtos.filter((produto) => {
        return produto.secao === namePoint;
    });
    montarListaProdutos(listaCategoria)
}
