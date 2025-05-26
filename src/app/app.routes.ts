
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './gards/auth.guard';
import { loginGuard } from './gards/login.guard';
import { DetailsComponent } from './components/details/details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewAllProductsComponent } from './components/Admin/Product/view-all-products/view-all-products.component';
import { AddProductComponent } from './components/Admin/Product/add-product/add-product.component';
import { UpdateProductComponent } from './components/Admin/Product/update-product/update-product.component';
import { ViewAllBrandComponent } from './components/Admin/Brand/view-all-brand/view-all-brand.component';
import { AddBrandComponent } from './components/Admin/Brand/add-brand/add-brand.component';
import { UpdateBrandComponent } from './components/Admin/Brand/update-brand/update-brand.component';
import { ViewAllCategoryComponent } from './components/Admin/Category/view-all-category/view-all-category.component';
import { AddCategoryComponent } from './components/Admin/Category/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/Admin/Category/update-category/update-category.component';
import { ViewAllUsersComponent } from './components/Admin/User/view-all-users/view-all-users.component';
import { AddUserComponent } from './components/Admin/User/add-user/add-user.component';



export const routes: Routes = [

  {path:'',component:AuthLayoutComponent,canActivate:[loginGuard],children:[
     {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
  ]},
  {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'products',component:ProductsComponent},
    {path:'cart',component:CartComponent},
    {path:'categories/:name',component:CategoriesComponent},
    {path:'brands',component:BrandsComponent},
    {path:'details/:name',component:DetailsComponent},
  ]},
  {
    path: '', loadComponent: () => import('./Layouts/dashboard-admin/dashboard-admin.component').then((m) => m.DashboardAdminComponent),

    children: [

      {
        path: "dashboard", component: DashboardComponent, title: "dashboard",

        children: [

          { path: "", redirectTo: "ViewAllProducts", pathMatch: 'prefix' },
          { path: "ViewAllProducts", component: ViewAllProductsComponent, title: "View All Products" },
          { path: "ViewAllProducts/addProduct", component: AddProductComponent, title: "Add Product" },
          { path: "ViewAllProducts/updateProduct/:id", component: UpdateProductComponent, title: "update Product" },



          { path: "ViewAllBrands", component: ViewAllBrandComponent, title: "View All Brand " },
          { path: "ViewAllBrand/addBrand", component: AddBrandComponent, title: "Add Brand" },
          { path: "ViewAllBrand/updateBrand/:id", component: UpdateBrandComponent, title: "update Brand" },


          { path: "ViewAllCategory", component: ViewAllCategoryComponent, title: "View All Category" },
          { path: "ViewAllCategory/addCategory", component: AddCategoryComponent, title: "Add Category" },
          { path: "ViewAllCategory/updateCategor/:id", component: UpdateCategoryComponent, title: "Update Category" },



          { path: "ViewAllUsers", component: ViewAllUsersComponent, title: "View All Users" },
          { path: "addUser", component: AddUserComponent, title: "AddUser" },
          { path: "ViewAllUsers", component: ViewAllUsersComponent, title: "View All Users" },

        ]
      }
    ]
  },
  {path:'**', component:NotfoundComponent}
];
