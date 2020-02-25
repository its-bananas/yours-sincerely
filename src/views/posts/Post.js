import React from 'react';
import { useParams } from 'react-router-dom';
import { FirestoreDocument } from 'react-firestore';
import ContentLoader from 'react-content-loader';

import Error from 'views/misc/Error';
import PageContent from 'components/PageContent';
import PostContent from 'components/PostContent';
import PostFooter from 'components/PostFooter';
import PostSignature from 'components/PostSignature';
import LikeButton from './LikeButton';

const Post = () => {
  const { postId } = useParams();
  return (
    <PageContent>
      <FirestoreDocument path={`posts/${postId}`}>
        {({ error, isLoading, data: post }) => {
          if (error) return <Error error={error} />;
          if (isLoading) return <PostContentLoader />;
          return (
            <>
              <PostContent>{post.content}</PostContent>
              <PostFooter>
                <PostSignature>{post.createdByDisplayName}</PostSignature>
                <LikeButton post={post} />
              </PostFooter>
            </>
          );
        }}
      </FirestoreDocument>
    </PageContent>
  );
};

const PostContentLoader = () => (
  <ContentLoader
    height={300}
    width="100%"
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" width="100%" height="25" rx="4" ry="4" />
    <rect x="0" y="40" width="100%" height="25" rx="4" ry="4" />
    <rect x="0" y="80" width="30%" height="25" rx="4" ry="4" />
  </ContentLoader>
);

export default Post;
