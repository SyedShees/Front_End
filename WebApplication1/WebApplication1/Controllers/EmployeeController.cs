using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Caching;
using System.Web.Helpers;
using System.Web.Http;
using WebApplication1.Models;


namespace WebApplication1.Controllers
{
    public class EmployeeController : ApiController
    {
        Employee emp = new Employee();
        // Routing the URL
        [Route("getemp")]
        public List<Employee> Get()
        {
            ObjectCache Cache = MemoryCache.Default;
            List<Employee> empl = new List<Employee>();
            var empdata = Cache.Get("employees") as List<Employee>;
            if (empdata == null)
            {
                SqlConnection myConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["myDBConnectionString1"].ConnectionString);
                string sql = "select * from Employees";
                SqlCommand cmd = new SqlCommand(sql, myConnection);
                myConnection.Open();
                cmd.CommandType = CommandType.Text;

                SqlDataReader dr = cmd.ExecuteReader();
                //Data Reading
                while (dr.Read())
                {

                    Employee emp = new Employee();

                    emp.id = Convert.ToInt32(dr["id"].ToString());
                    emp.name = dr["name"].ToString();
                    emp.department = dr["department"].ToString();


                    empl.Add(emp);

                }
                CacheItemPolicy itempolicy = new CacheItemPolicy
                {
                    AbsoluteExpiration = DateTime.Now.AddSeconds(10),
                };
                Cache["students"] = empl;
                myConnection.Close();
                //
                return empl;
            }
            else
            {
                return empdata;
            }
        }


        [Route("getempdetails")]
        public List<Employee> Get(int id)
        {

            List<Employee> empl = new List<Employee>();
            SqlConnection myConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["myDBConnectionString1"].ConnectionString);
            string sql = "select * from Employees where id = " + id;
            SqlCommand cmd = new SqlCommand(sql, myConnection);
            myConnection.Open();
            cmd.CommandType = CommandType.Text;

            SqlDataReader dr = cmd.ExecuteReader();
            //Data Reading
            while (dr.Read())
            {

                Employee emp = new Employee();

                emp.id = Convert.ToInt32(dr["id"].ToString());
                emp.name = dr["name"].ToString();
                emp.department = dr["department"].ToString();


                empl.Add(emp);
                
                //
                
            }
            myConnection.Close();
            return empl;
        }


        [HttpPost]
        [Route("delEmp")]
        public void  del([FromBody]int id)
        {

            List<Employee> empl = new List<Employee>();
            SqlConnection myConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["myDBConnectionString1"].ConnectionString);
            string sql = "Delete from Employees where id=" + id;
            SqlCommand cmd = new SqlCommand(sql, myConnection);
            myConnection.Open();
            cmd.CommandType = CommandType.Text;
            cmd.ExecuteNonQuery();
            myConnection.Close();
            //Data Reading
            this.Get();
        }

        [HttpPost]
        [Route("addEmp")]
        public void Post([FromBody] string name)
        {
            
            //Employee emp = JsonConvert.DeserializeObject<Employee>(data);
            SqlConnection myConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["myDBConnectionString1"].ConnectionString);
            myConnection.Open();
            string sql = "Insert into Employees(name,department) values ("+name+")";
            SqlCommand cmd = new SqlCommand(sql, myConnection);
            cmd.CommandType = CommandType.Text;
            cmd.ExecuteNonQuery();
            myConnection.Close(); 

        }
    }
}
