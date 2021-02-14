import {BrowserRouter as Router,Route} from 'react-router-dom'

import Post from './components/body/post/Post'
import DetailPost from './components/body/detailPost/Detailpost'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Post} exact/>
        <Route path="/post/:id" component={DetailPost} exact/>
      </div>
    </Router>
    
  );
}

export default App;
