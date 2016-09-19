/**
 * Created by chuck7 on 16/9/19.
 */
import api from '../index.js'
export default {
  getAllTags(){
    return api.get('tags',undefined);
  },
}
