import React from 'react';
import{ Route,IndexRoute } from 'react-router';

import App from "../client/js/containers/app";
import Index_main from "../client/js/components/index_main";
import Search from "../client/js/components/search";
import Publish from "../client/js/components/publish";
import List from "../client/js/components/list";
import Adetaile from "../client/js/components/articleDetail";
export default(
    <Route path="/" component={App}>
        <IndexRoute component={Index_main} />
        <Route path="/publish" component={Publish} />
        <Route path="/list" component={List} />
        <Route path="/search" component={Search} />
        <Route path="/articleDetail" component={Adetaile} />
    </Route>
)
