using System;
using System.Globalization;
using System.Linq;
using AutoMapper;
using FarshBoom.Dtos;
using FarshBoom.Models;

namespace FarshBoom.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
           CreateMap<User, UserForLoginDto>();
           CreateMap<UserForRegisterDto, User>();
           CreateMap<UserForDetailDto, User>().ReverseMap();
           
           CreateMap<Good, GoodDto>().ForMember(des => des.Size, opt => {
                opt.MapFrom(woak => woak.Size.Title);}).ForMember(des => des.Plan, opt => {
                opt.MapFrom(woak => woak.Plan.Title);}).ForMember(des => des.Type, opt => {
                opt.MapFrom(woak => woak.Type.Title);}).ForMember(des => des.Brand, opt => {
                opt.MapFrom(woak => woak.Brand.Title);}).ForMember(des => des.Color, opt => {
                opt.MapFrom(woak => woak.Color.Title);}).ForMember(des => des.Porz, opt => {
                opt.MapFrom(woak => woak.Porz.Title);}).ForMember(des => des.Chele, opt => {
                opt.MapFrom(woak => woak.Chele.Title);}).ForMember(des => des.Raj, opt => {
                opt.MapFrom(woak => woak.Raj.Title);}).ForMember(des => des.User, opt => {
                opt.MapFrom(woak => woak.User.Username);}).ForMember(des => des.Color2, opt => {
                opt.MapFrom(woak => woak.Color2.Title);});
            CreateMap<GoodInsertDto, Good>();
            CreateMap<SlideUpdateDto, Slide>();

            
            CreateMap<Like, LikeDto>().ForMember(des => des.User, opt => {
                opt.MapFrom(woak => woak.User.Title);}).ForMember(des => des.PersianDate, opt => {
                opt.MapFrom(woak => woak.AddedDate);});
        }
        public string ToPersianDate(DateTime thisDate)
        {
            PersianCalendar pc = new PersianCalendar();
            return string.Format("{0}, {1}/{2}/{3} {4}:{5}:{6}\n",
                      pc.GetDayOfWeek(thisDate),
                      pc.GetMonth(thisDate),
                      pc.GetDayOfMonth(thisDate),
                      pc.GetYear(thisDate),
                      pc.GetHour(thisDate),
                      pc.GetMinute(thisDate),
                      pc.GetSecond(thisDate));
        }
    }
}