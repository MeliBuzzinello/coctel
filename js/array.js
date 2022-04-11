class Producto {
    constructor(id, tipo, marca, stock, precioMayorista, descripcion){
        this.id = id;
        this.tipo = tipo.toLowerCase();
        this.marca = marca.toLowerCase();
        this.stock = parseInt(stock);
        this.precioMayorista = parseFloat(precioMayorista);
        this.descripcion = descripcion;
    }
    precioPublico(){
        return this.precioMayorista + (this.precioMayorista * 50/100);
    }
}


const listaProductos = [new Producto ('1','Vino','Santa Julia',132, 321, 'chenin dulce 750ml'),
new Producto('2','Vino','Luigi Bosca',198, 789, 'malbec 750ml'),
new Producto('3','Vino','Alma Negra',53, 213, 'cabernet sauvignon 750ml'),
new Producto('4','Vino','Norton',45, 189, 'rosado malbec 750ml'),
new Producto('5','Gin','Casa Rosa',67, 998, '500ml'),
new Producto('6','Gin','Aconcagua',23, 1020, '750ml'),
new Producto('7','Whisky','Chivas',57, 1520, '12 años 500ml'),
new Producto('8','Vodka','Sernova',78, 480, '700ml'),
new Producto('9','Vodka','Sernova',45, 430, 'citrus 700ml'),
new Producto('10','Ron','Havana Club',18 , 6320, 'seleccion de maestros 750ml'),
new Producto('11','Fernet','Branca',97, 790, '750ml'),
new Producto('12','Licor','Baileys',32, 1567, 'caramelo 750ml'),
];