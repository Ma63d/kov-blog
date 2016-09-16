/**
 * Created by chuck7 on 16/9/14.
 */
import api from '../index.js'
export default {
  getDraftList(){
    return api.get('drafts',undefined,{Authorization:'Bearer '+sessionStorage.getItem('token')});
  }
}
