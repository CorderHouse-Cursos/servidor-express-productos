let fs = require("fs")



const errorMessage = err => console.error("Hubo un error en la ejecucion" + err)

class Contenedor {

   constructor(nombre) {
      this.nombre = nombre
      this.data = []
   }

   async getAll() {
      try {
         const data = await fs.promises.readFile(`./${this.nombre}`, 'utf-8')

         if (data.length === 0) return []
         this.data = JSON.parse(data)

         return this.data


      } catch (err) {

         errorMessage(err)


      }
   }
   async getById(id) {
      const data = await this.getAll()
      console.log(`Informacion del ID ${id}`)
      return data.find(item => item.id === id)
   }
   async deleteAll() {
      try {
         console.log(`Eliminado todos los productos`)
         this.data = []
         await this._saveData(this.data)
      } catch (err) {
         errorMessage(err)
      }
   }
   async deleteById(id) {
      try {
         const data = await this.getAll()
         const filter = data.filter(item => item.id !== id)
         console.log(`Eliminado ID ${id}`)
         this._saveData(filter)

      } catch (err) {
         errorMessage(err)
      }
   }
   async save(data) {
      try {
         const allData = await this.getAll()
         const id = allData.length >= 1 ? allData[allData.length - 1].id + 1 : 1
         const newData = { ...data, id: id }

         this.data.push(newData)
         await this._saveData(this.data)
         console.log(`Guardando ID ${id}`)
         return id

      } catch (err) {
         errorMessage(err)
      }

   }


   async _saveData(array) {
      try {
         await fs.promises.writeFile(`./${this.nombre}`, array.length ? JSON.stringify(array) : '')
      } catch (err) {
         errorMessage(err)
      }
   }
}






async function main() {
   const contenedor = new Contenedor("productos.txt")


   await contenedor.save({ "title": "Milanesa", "price": "300", "thumbnail": "url.com" })
   await contenedor.save({ "title": "Pure", "price": "300", "thumbnail": "url.com" })
   await contenedor.save({ "title": "Panchos", "price": "300", "thumbnail": "url.com" })
   await contenedor.save({ "title": "Hamburgesa", "price": "300", "thumbnail": "url.com" })

}



module.exports = Contenedor