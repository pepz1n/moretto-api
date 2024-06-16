import Usuarios from "./UsuariosModel";
import Perfis from "./PerfisModel";
import UsuarioPerfilModel from "./UsuarioPerfilModel";
import ProdutosModel from "./ProdutosModel";

(async () => {
  await Usuarios.sync({ force: true })
  await Perfis.sync({ force:true })
  await UsuarioPerfilModel.sync({ force:true })
  await ProdutosModel.sync({ force:true })
})();