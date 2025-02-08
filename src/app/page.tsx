import LeftSidebar from '@/components/layout/LeftSidebar';
import PostsPage from './posts/page'
import RightSidebar from '@/components/layout/RightSidebar';
import AddPost from './user/create-post/page';

export default function Home() {
  return (
    <div className="m-auto lg:container">
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">

      <div className="hidden md:block col-span-4 lg:col-span-3">
        <LeftSidebar />
      </div>

      <div className="col-span-4 lg:col-span-6">
        <div className='flex flex-col'>
          <AddPost/>
          <PostsPage/>
        </div>
      </div>

      <div className="hidden md:block col-span-4 lg:col-span-3">
        <RightSidebar />
      </div>

    </div>
  </div>
    
  );
}
