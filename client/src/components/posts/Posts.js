import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Preloader from "../common/Preloader"
import { getAllPosts } from "../../redux/reducers/postReducer";

class Posts extends React.Component {
    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        const { posts, loading } = this.props.post;
        let postContent;

        if (posts === null || loading) {
            postContent = <Preloader />;
        } else {
            postContent = <PostFeed posts={posts} />;
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getAllPosts })(Posts);