class Producto {
    constructor(id, tipo, marca, stock, precioMayorista, descripcion, imagen){
        this.id = id;
        this.tipo = tipo.toLowerCase();
        this.marca = marca.toLowerCase();
        this.stock = parseInt(stock);
        this.precioMayorista = parseFloat(precioMayorista);
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.cantidad = 1;
        this.seleccionado = false;
    }
    precioPublico(){
       let precioalPublico = this.precioMayorista + (this.precioMayorista * 50/100);
       return precioalPublico; 
    }
}


const listaProductos = [new Producto ('1','Vino','Finca Magnolia',132, 321, 'Chardonnay-Sauvignon Blanc 750ml', 'assets/img/FincaMagnolia_BlendBlancas_1000x1000px-min_large.webp'),
new Producto('2','Vino','Familia Deicas',198, 789, 'Single Vineyard Malbec 750ml', 'assets/img/familia_deicas_1024x1024.webp'),
new Producto('3','Vino','Terrible Corte 2014',53, 213, 'cabernet sauvignon 750ml', 'assets/img/Vinoterriblecorte2014_1024x1024.webp'),
new Producto('4','Vino','Mythic Vineyard',45, 189, 'Chardonnay 750ml', 'assets/img/blanc_mythic_1_1024x1024.webp'),
new Producto('5','Gin','Bosque Craft',67, 998, '500ml', 'assets/img/GinBosque2_1024x1024.webp'),
new Producto('6','Gin','Rock Rose Pink',23, 1020, 'Old Tom dulce picante 700ml', 'assets/img/rock_rose_1000x1647_d8d3f494-dc58-4969-b97b-d2d0e4f0c0ce_1024x1024.webp'),
new Producto('7','Whisky','Chivas',57, 1520, '12 años 500ml','assets/img/Absolut_Mandrin_1000_x_2048_1000x1200.webp'),
new Producto('8','Vodka','Pravda',78, 1480, 'Caramelo 750ml', 'assets/img/VodkaPravdaCaramelo_1024x1024.webp'),
new Producto('9','Vodka','Absolut',45, 930, 'Mandarin 750ml', 'assets/img/Absolut_Mandrin_1000_x_2048_1000x1200.webp'),
new Producto('10','Ron','Havana Club',18 , 6320, 'seleccion de maestros 750ml', 'assets/img/RonHavanaClub7_1000x1200.webp'),
new Producto('11','Fernet','Buhero',97, 790, '700ml', 'assets/img/FernetBuhero_1024x1024.webp'),
new Producto('12','Licor','Mastership',32, 1567, 'Nero Premium 750ml', 'assets/img/Nero_MasterShip_1000x1000px_2-min_1024x1024.webp'),
new Producto('13','Vodka','Absolut',32, 1567, 'Raspberri 750ml', 'assets/img/absolut-vodka-raspberri_1000x1200.webp'),
];