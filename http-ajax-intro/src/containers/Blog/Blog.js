import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Posts from './Posts/Posts';
import FullPost from './FullPost/FullPost';
import NewPost from './NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  render () {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>
                <Link to={{
                  pathname: "/new-post",
                  hash: "#submit",
                  search: "?quick-submit=true"
                }}>
                  New Post
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {/*<Route path="/" exact render={() => <h1>Home</h1>} />*/}
        <Route path="/" exact component={Posts} />
        <Route path="/new-post" exact component={NewPost} />

        {/*<section>
          <FullPost
            id={this.state.selectedPostId}
          />
        </section>>*/}
      </div>
    );
  }
}

export default Blog;