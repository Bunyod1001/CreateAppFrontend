import { BlogCard, Navbar } from "@/components";
import { BlogType } from "@/interface/blog.interface";
import Layout from "@/layout";
import { BlogService } from "@/services/blog.service";

import type { GetServerSideProps, NextPage } from "next";


const Home: NextPage<HomePageProps> = ({blogs}) => {
  
  
  return (
    
    <Layout>
    <div className="album py-5">
    <div className="container">
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {blogs.map(item => (
        <BlogCard item={item} key={item._id}/>
      ))}
      </div>
      </div>
      </div>
      </Layout>
  )
}


export default Home;


export const getServerSideProps: GetServerSideProps <HomePageProps> = async () => {
  const blogs = await BlogService.getAllBlogs();
  return {
    props: {blogs},
  };
};


interface HomePageProps {
  blogs:BlogType[];
}