import Form from "@/components/form/form";
import { FormValue } from "@/components/form/form.props";
import Layout from "@/layout";
import { BlogService } from "@/services/blog.service";
import { useState } from "react";

const CreateBlog = () => {
  

  const onSubmit =  async (formData: FormValue) => {
    const data = await BlogService.createBlog(formData);
    return data;
  };
    return (
    <Layout>
        <Form onSubmit={onSubmit}  sectionTitle={"Create blog"}/>
    </Layout>
  )
}

export default CreateBlog;