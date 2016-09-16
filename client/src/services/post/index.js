/**
 * Created by chuck7 on 16/9/7.
 */
import api from '../index.js'
export default {
  getPost(id){
    return api.get(`articles/${id}`)
  }
}
