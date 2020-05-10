using System.Threading.Tasks;
using AutoMapper;
using FarshBoom.Models;
using FarshBoom.Repositories.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Collections.Generic;
using FarshBoom.Dtos;
using System;
using FarshBoom.Helpers;
using System.Linq;

namespace FarshBoom.Controllers
{    
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private IMapper _mapper;
        public DashboardController(IMapper mapper)
        {
            _mapper = mapper;
        }
        [HttpGet("getBrnads")]
        public IActionResult GetBrnads() 
        {        
            string connectionString = "Data Source=185.88.152.127,1430;Initial Catalog=94_farsheboom ;User Id=94_vaq;Password=V@qef2512740;MultipleActiveResultSets=True;Max Pool Size=9000;persist security info=True;";
            SqlConnection cnn = new SqlConnection(connectionString);
            if(cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand();
            command.Connection = cnn;
            command.CommandText = @"SELECT TOP (8) count(ibt_srl) as brand,brand_name FROM [94_farsheboom].[dbo].[Project_Goods_View]
            group by brand_name  order by brand desc";
            SqlDataReader reader = command.ExecuteReader();
            List<BrandDto> lstBrand = new List<BrandDto>();
            while (reader.Read())
            {
                if(reader["brand"] == null)
                    continue;
                BrandDto brand = new BrandDto();
                brand.Brand = Convert.ToInt32(reader["brand"]);
                brand.BrandName = reader["brand_name"].ToString();
                lstBrand.Add(brand);
            }
            int total = lstBrand.Sum(a => a.Brand);
            foreach(BrandDto woak in lstBrand)
            {
                woak.Brand = (woak.Brand * 100) / total;
            }
            total = lstBrand.Sum(a => a.Brand);
            int remain = 100 - total;

            for(int i=0; i<remain; i++)
            {
                lstBrand[i].Brand = lstBrand[i].Brand + 1;
            }
            reader.Close();
            command = new SqlCommand();
            command.Connection = cnn;
            command.CommandText = @"SELECT count(srl) as cnt FROM [94_farsheboom].[dbo].[bas_project]";
            reader = command.ExecuteReader();
            List<StringModel> lstUbozhi = new List<StringModel>();
            while (reader.Read())
            {
                if(reader["cnt"] == null)
                    continue;
                StringModel ubozhi = new StringModel();
                ubozhi.Id = Convert.ToInt32(reader["cnt"]);
                ubozhi.Name = "exhibition";
                lstUbozhi.Add(ubozhi);
            }
            reader.Close();
            command = new SqlCommand();
            command.Connection = cnn;
            command.CommandText = @"SELECT count(srl) as cnt FROM [94_farsheboom].[dbo].[bas_provider]";
            reader = command.ExecuteReader();
            while (reader.Read())
            {
                if(reader["cnt"] == null)
                    continue;
                StringModel ubozhi = new StringModel();
                ubozhi.Id = Convert.ToInt32(reader["cnt"]);
                ubozhi.Name = "provider";
                lstUbozhi.Add(ubozhi);
            }

            cnn.Close();

            return Ok(new {lstBrand, lstUbozhi});
        }

        [HttpGet("getProjects")]
        public IActionResult GetProjects() 
        {        
            string connectionString = "Data Source=185.88.152.127,1430;Initial Catalog=94_farsheboom ;User Id=94_vaq;Password=V@qef2512740;MultipleActiveResultSets=True;Max Pool Size=9000;persist security info=True;";
            SqlConnection cnn = new SqlConnection(connectionString);
            if(cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand();
            command.Connection = cnn;
            command.CommandText = @"SELECT top(8) Count(header_srl) header, project_name, from_date FROM [94_farsheboom].[dbo].[Project_Goods_View] group by project_name, from_date order by from_date desc";
            SqlDataReader reader = command.ExecuteReader();
            List<ProjectDto> lstProject = new List<ProjectDto>();
            while (reader.Read())
            {
                if(reader["header"] == null)
                    continue;
                ProjectDto project = new ProjectDto();
                project.Header = Convert.ToInt32(reader["header"]);
                project.ProjectName = reader["project_name"].ToString();
                project.FromDate = reader["from_date"].ToString();
                lstProject.Add(project);
            }
            cnn.Close();
            lstProject.Reverse();
            return Ok(lstProject);
        }
        [HttpGet("getAllGoods")]
        public IActionResult GetAllGoods([FromQuery]UserParams userParams) 
        {        
            string where = string.Empty;
            if(userParams.TypeId != null)
                where += "And carpet_type = " + userParams.TypeId;
            if(userParams.SizeId != null)
                where += "And size_srl = " + userParams.SizeId;
            if(userParams.BrandId != null)
                where += "And ibt_srl = " + userParams.BrandId;
            if(userParams.ColorId != null)
                where += "And color_srl = " + userParams.ColorId;
            if(userParams.PorzId!= null)
                where += "And porz_type = " + userParams.PorzId;

            string connectionString = "Data Source=185.88.152.127,1430;Initial Catalog=94_farsheboom ;User Id=94_vaq;Password=V@qef2512740;MultipleActiveResultSets=True;Max Pool Size=9000;persist security info=True;";
            SqlConnection cnn = new SqlConnection(connectionString);
            if(cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand();
            command.Connection = cnn;
            // 
            command.CommandText = @"SELECT Top(300) [srl], [porz_type] ,[chele_type] ,[carpet_type] ,[ibt_srl] ,[size_srl] ,[color_srl] ,[color_srl2], [raj_srl], [title_igd], [lenght] ,[widht] ,[code_igd] ,[provider_code] ,[brand_name], [size_title], [color_name], [porz_title], [carpet_title] FROM [94_farsheboom].[94_vaq].[FarshBoomSite] Where (sold = 0 or sold is null)" + where + " Order By srl Desc";
            SqlDataReader reader = command.ExecuteReader();
            List<GoodDto> lstGood = new List<GoodDto>();
            while (reader.Read())
            {
                if(reader["title_igd"].ToString().Length < 5)
                    continue;
                GoodDto good = new GoodDto();
                good.Id = Convert.ToInt32(reader["srl"]);
                good.ImageUrl = reader["title_igd"].ToString();
                good.FarshboomCode = reader["code_igd"].ToString();
                good.ProviderCode = reader["provider_code"].ToString();

                good.Brand = reader["brand_name"].ToString();
                good.Size = reader["size_title"].ToString();
                good.Color = reader["color_name"].ToString();
                good.Porz = reader["porz_title"].ToString();
                good.Type = reader["carpet_title"].ToString();

                good.ImageUrl = reader["title_igd"].ToString();
                good.ImageUrl = good.ImageUrl.Replace("../", "http://bank.farshboom.com/");
                 if(reader["porz_type"] != null && !Convert.IsDBNull(reader["porz_type"]))
                     good.PorzId = Convert.ToInt32(reader["porz_type"]);
                 if(reader["chele_type"] != null && !Convert.IsDBNull(reader["chele_type"]))
                     good.CheleId = Convert.ToInt32(reader["chele_type"]);
                 if(reader["carpet_type"] != null && !Convert.IsDBNull(reader["carpet_type"]))
                     good.TypeId = Convert.ToInt32(reader["carpet_type"]);
                 if(reader["ibt_srl"] != null && !Convert.IsDBNull(reader["ibt_srl"]))
                     good.BrandId = Convert.ToInt32(reader["ibt_srl"]);
                 if(reader["size_srl"] != null && !Convert.IsDBNull(reader["size_srl"]))
                     good.SizeId = Convert.ToInt32(reader["size_srl"]);
                 if(reader["color_srl"] != null && !Convert.IsDBNull(reader["color_srl"]))
                     good.ColorId = Convert.ToInt32(reader["color_srl"]);
                 if(reader["color_srl2"] != null && !Convert.IsDBNull(reader["color_srl2"]))
                     good.ColorId2 = Convert.ToInt32(reader["color_srl2"]);
                if(reader["lenght"] != null && !Convert.IsDBNull(reader["lenght"]))
                    good.Lenght = Convert.ToInt32(reader["lenght"]);
                if(reader["widht"] != null && !Convert.IsDBNull(reader["widht"]))
                    good.Width = Convert.ToInt32(reader["widht"]);
                 if(reader["raj_srl"] != null && !Convert.IsDBNull(reader["raj_srl"]))
                     good.RajId = Convert.ToInt32(reader["raj_srl"]);

                lstGood.Add(good);
            }
            cnn.Close();

            var pagedList = lstGood.AsQueryable();
            var goods = Paginiation<GoodDto>.CreateAsync(pagedList, userParams.PageNumber, userParams.PageSize);

            IEnumerable<GoodDto> goodDto;
            goodDto = _mapper.Map<IEnumerable<GoodDto>>(goods);   


            Response.AddPagination(goods.CurrentPage, goods.PageSize,
                goods.TotalCount, goods.TotalPages);
            return Ok(goodDto);
        }
        [HttpGet("getGood")]
        public IActionResult GetGood(string key, string field) 
        {      
            string connectionString = "Data Source=185.88.152.127,1430;Initial Catalog=94_farsheboom ;User Id=94_vaq;Password=V@qef2512740;MultipleActiveResultSets=True;Max Pool Size=9000;persist security info=True;";
            SqlConnection cnn = new SqlConnection(connectionString);
            if(cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand();
            command.Connection = cnn;
            // 
            command.CommandText = @"SELECT [srl], [porz_type] ,[chele_type] ,[carpet_type] ,[ibt_srl] ,[size_srl] ,[color_srl] ,[color_srl2], [raj_srl], [title_igd], [lenght] ,[widht] ,[code_igd] ,[provider_code] ,[brand_name], [size_title], [color_name], [porz_title], [carpet_title] FROM [94_farsheboom].[94_vaq].[FarshBoomSite] Where (sold = 0 or sold is null) And srl=" + key ;
            SqlDataReader reader = command.ExecuteReader();
            
            GoodDto good = new GoodDto();
            while (reader.Read())
            {
                if(reader["title_igd"].ToString().Length < 5)
                    continue;
                
                good.Id = Convert.ToInt32(reader["srl"]);
                good.ImageUrl = reader["title_igd"].ToString();
                good.FarshboomCode = reader["code_igd"].ToString();
                good.ProviderCode = reader["provider_code"].ToString();

                good.Brand = reader["brand_name"].ToString();
                good.Size = reader["size_title"].ToString();
                good.Color = reader["color_name"].ToString();
                good.Porz = reader["porz_title"].ToString();
                good.Type = reader["carpet_title"].ToString();

                good.ImageUrl = reader["title_igd"].ToString();
                good.ImageUrl = good.ImageUrl.Replace("../", "http://bank.farshboom.com/");
                 if(reader["porz_type"] != null && !Convert.IsDBNull(reader["porz_type"]))
                     good.PorzId = Convert.ToInt32(reader["porz_type"]);
                 if(reader["chele_type"] != null && !Convert.IsDBNull(reader["chele_type"]))
                     good.CheleId = Convert.ToInt32(reader["chele_type"]);
                 if(reader["carpet_type"] != null && !Convert.IsDBNull(reader["carpet_type"]))
                     good.TypeId = Convert.ToInt32(reader["carpet_type"]);
                 if(reader["ibt_srl"] != null && !Convert.IsDBNull(reader["ibt_srl"]))
                     good.BrandId = Convert.ToInt32(reader["ibt_srl"]);
                 if(reader["size_srl"] != null && !Convert.IsDBNull(reader["size_srl"]))
                     good.SizeId = Convert.ToInt32(reader["size_srl"]);
                 if(reader["color_srl"] != null && !Convert.IsDBNull(reader["color_srl"]))
                     good.ColorId = Convert.ToInt32(reader["color_srl"]);
                 if(reader["color_srl2"] != null && !Convert.IsDBNull(reader["color_srl2"]))
                     good.ColorId2 = Convert.ToInt32(reader["color_srl2"]);
                if(reader["lenght"] != null && !Convert.IsDBNull(reader["lenght"]))
                    good.Lenght = Convert.ToInt32(reader["lenght"]);
                if(reader["widht"] != null && !Convert.IsDBNull(reader["widht"]))
                    good.Width = Convert.ToInt32(reader["widht"]);
                 if(reader["raj_srl"] != null && !Convert.IsDBNull(reader["raj_srl"]))
                     good.RajId = Convert.ToInt32(reader["raj_srl"]);

            }
            cnn.Close();
            return Ok(new {goodDto = good});
        }
    }
}