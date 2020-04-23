import React from "react";
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverviewWithSpinner from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {

  componentDidMount() {
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const {match} = this.props;
    // return (
    //   <div className='shop-page'>
    //     <Route exact path={`${match.path}`} component={CollectionsOverview}/>
    //     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    //   </div>
    // );
    return (
      <div className='shop-page'>
        <Route 
          exact path={`${match.path}`} 
          component={CollectionsOverviewWithSpinner}
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          component={CollectionPageContainer}
        />
      </div>
    );
  }
} 


const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})


export default connect(null, mapDispatchToProps)(ShopPage);
