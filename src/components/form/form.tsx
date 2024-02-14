import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react"
import { ErrorType, FormProps, FormValue } from "./form.props"


const Form = ({onSubmit, sectionTitle, values}: FormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const[formValue, setFormValue] = useState<FormValue>
  ({title: "", description: "", excerpt: "",});

  const router = useRouter();

  const onChange = (name: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    setFormValue({...formValue, [name]: e.target.value});
  };
  
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try{
      await onSubmit(formValue);
      router.push("/");
    }catch(error){
      const result = error as ErrorType;
      setLoading(false);
      if(result.response.data.message) {
        setError(result.response.data.message);
      }else{
        setError([result.message]);
      }
      console.log(result.response.data.message); 
    }
  };

   const removeErrorItem = (item:string) => {
    setError(error.filter(err => err !== item))
   }
   useEffect(() => {
        setFormValue({
          title:values?.title,
          excerpt:values?.excerpt,
          description:values?.description,
        });

        //eslint-disable-next-line
   }, [router]);                         // Qaaraa shu yerda HAtooo borr
  return (
    <div>
        <h4 className="text-center">{sectionTitle}</h4>
        <main className="form-signin w-50 m-auto">
          {error.length && 
          error.map(item => (
      <div key={item} className="alert alert-warning alert-dismissible fade show" role="alert">  
        <span>{item}</span>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => removeErrorItem(item)}/>
      </div>
          ))}
        <form onSubmit={submitHandler}>
    <div className="form-floating  text-black ">
    <input type="text" className="form-control "  value={formValue.title} onChange={onChange("title")}  id="floatingInput" placeholder="Title"/>
      <label htmlFor="floatingInput  ">Title</label>
    </div>
    <div className="form-floating  text-black">
    <input type="text" className="form-control "  value={formValue.excerpt} onChange={onChange("excerpt")} id="floatingInput" placeholder="Excerpt"/>
      <label htmlFor="floatingInput  ">Excerpt</label>
    </div>
    <div className="form-floating  text-black">
  <textarea className="form-control"  value={formValue.description} onChange={onChange("description")} placeholder="Leave a comment here" id="floatingTextarea2" style={{height:"200px"}}></textarea>
  <label htmlFor="floatingTextarea2">Descripton</label>
</div>
    <button disabled={loading} className="w-100 btn btn-lg btn-primary"  type="submit">
      {loading ? "Loading..." : "Submit"}
    </button>
    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
  </form>
  </main>
    </div>
  )
}

export default Form