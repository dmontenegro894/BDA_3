const Libro = require('./Libro');
const Carrito = require('./carrito');


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
user: String,

    module.exports = function Carrito(oldCarrito) {
        this.items = oldCarrito.items || {};
        this.totalPrecioLibro = oldCarrito.totalPrecioLibro || 0;
        this.totalCantidadLibro = oldCarrito.totalCantidadLibro || 0;

        this.add = function(item, id) {
            var storedItem = this.items[id];
            if (!storedItem) {
                storedItem = this.items[id] = { item: item, cantidad: 0, precioLibro: 0 };
            }
            storedItem.cantidad++;
            storedItem.precioLibro = storedItem.item.precioLibro * storedItem.cantidad;
            this.totalCantidadLibro++;
            this.totalPrecioLibro += storedItem.item.precioLibro;

        };

        this.reducirUno = function(id) {
            this.items[id].cantidad--;
            this.items[id].precioLibro -= this.items[id].item.precioLibro;
            this.totalCantidadLibro--;
            this.totalPrecioLibro -= this.items[id].item.precioLibro;

            if (this.items[id].cantidad <= 0) {
                delete this.items[id]
            }
        }

        this.generateArray = function() {
            var arr = [];
            for (var id in this.items) {
                arr.push(this.items[id]);
            }
            return arr;
        };
    };