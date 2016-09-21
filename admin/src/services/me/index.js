/**
 * Created by chuck7 on 16/9/21.
 */
import api from '../index.js'
export default {
  getAboutMe(){
    return api.get('me');
  },
  modifyAboutMe(content){
    return api.patch('me',{content})
  }
}
