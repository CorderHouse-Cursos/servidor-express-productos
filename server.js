const app = require('express')();
const Contenedor = require('./contenedor');
const PORT = 8080;




app.get("/productos", async (req, res) => {
   const contenedor = new Contenedor("productos.txt");
   const productos = await contenedor.getAll();
   res.json(productos);
})

app.get("/productoRandom", async (req, res) => {
   let producto = undefined
   const contenedor = new Contenedor("productos.txt");
   const productos = await contenedor.getAll();
   if (productos.length == 0) {
      res.json({ "message": "No hay productos" })
   }
   while (!producto) {
      const index = Math.round(Math.random() * 10);
      if (productos.length < 0) {
         res.json({ "message": "No hay productos" });
      }



      producto = productos[index];
   }

   res.json(producto);

})


app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`);
})


