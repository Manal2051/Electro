

for %i in ( home,navbar,notfound,login,register) do ng g c commponents/%i  //to create more than one component 
npm i bootstrap @fortawesome/fontawesome-free
go to angularjs 
  "./node_modules/@fortawesome/fontawesome-free/css/all.min.css",
   "./node_modules/bootstrap/dist/css/bootstrap.min.css",

  "./node_modules/bootstrap/dist/js/bootstrap.bundle.js"


  create folder assets and add images in it 
  create foder layouts and add component with the number of layout 

  ng g c layouts/auth-layout
  ng g c layouts/blank-layout

  go to route
  add 
  {path:'auth',component:AuthLayoutComponent,children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
  ]},
  {path:'blank',component:BlankLayoutComponent,children:[
    {path:'home',component:HomeComponent},
    {path:'products',component:ProductsComponent},
    {path:'cart',component:CartComponent},
    {path:'categories',component:CategoriesComponent},
    {path:'brands',component:BrandsComponent},
  ]},
  {path:'**', component:NotfoundComponent}
]

  اي حاجه بتتحط داخل الarray بتاعت routes بيكون تقليبتها داخل appcomponent


<router-outlet></router-outlet> inside app.html



<p>blank-layout works!</p>  inside blank layout and do this in auth also
<app-nav-blank></app-nav-blank>


to make smoth التنقل مش بخضه  we add  withViewTransitions() in config 
provideRouter(routes ,withViewTransitions() )


reactive form 
templete driven form 


@rxweb/reactive-form-validators
