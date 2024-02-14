import Form from '@/components/form/form';
import { FormValue } from '@/components/form/form.props';
import { BlogType } from '@/interface/blog.interface';
import Layout from '@/layout';
import { BlogService } from '@/services/blog.service';
import { GetServerSideProps, NextPage } from 'next';


const EditBlog: NextPage<EditBlogPageProps> = ({blog}) => {
    const onSubmit =  async (formData: FormValue) => {
        const data = await BlogService.editBlog(formData, blog._id);
        return data;
      };
        return (
        <Layout>
            <Form onSubmit={onSubmit}  sectionTitle={`Edit ${blog.title}`} values={blog}/>
        </Layout>
      )
}

export default EditBlog



export const getServerSideProps: GetServerSideProps<EditBlogPageProps> = async ({query}) => {
  
    const blog = await BlogService.getBlogBySlug(query.slug as string);
    return{
      props:{blog},
    };
  };
  
  interface EditBlogPageProps{
    blog: BlogType;
  }