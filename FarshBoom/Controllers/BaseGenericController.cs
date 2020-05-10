using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FarshBoom.Model;
using FarshBoom.Models;
using FarshBoom.Repositories.Generic;
using Microsoft.AspNetCore.Mvc;

namespace FarshBoom.Controllers
{
    public class BaseGenericController<TEntity, TViewModel> : Controller where TEntity : BaseEntity where TViewModel : BaseViewModel
    {
        IMapper _mapper;
        IGenericRepository<TEntity> _repository;

        public BaseGenericController(IGenericRepository<TEntity> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<IActionResult> Index()
        {
            var items = await _repository.GetAllAsync();

            var model = _mapper.Map<IEnumerable<TEntity>, IEnumerable<TViewModel>>(items);
            return Ok();
        }

        [HttpGet]
        public IActionResult Create()
        {
            return Ok();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(TViewModel model)
        {

            model.SystemUserId = User.FindFirst(x => x.Type == "sub" || x.Type == ClaimTypes.NameIdentifier)?.Value;
            if (ModelState.IsValid)
            {
                var item = _mapper.Map<TViewModel, TEntity>(model);

                if (_repository.GetAsQueryable(x => x.Title == item.Title).Any())
                {
                    ModelState.AddModelError("", "error");
                    return Ok();
                }

                await _repository.InsertAsync(item);

                if (Request.Form.Keys.Contains("SaveAndReturn"))
                    return RedirectToRoute("Index");
                else
                    return RedirectToRoute("Edit", new { id = item.Id });
            }
            return Ok(model);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var item = await _repository.GetByIDAsync(id);
            var model = _mapper.Map<TEntity, TViewModel>(item);

            return Ok(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(TViewModel model)
        {
            model.SystemUserId = User.FindFirst(x => x.Type == "sub" || x.Type == ClaimTypes.NameIdentifier)?.Value;

            if (ModelState.IsValid)
            {
                var item = _mapper.Map<TViewModel, TEntity>(model);

                if (_repository.GetAsQueryable(x => x.Title == item.Title && x.Id != item.Id).Any())
                {
                    ModelState.AddModelError("", "");
                    return Ok(model);
                }


                var result = await _repository.UpdateAsync(item);

                if (Request.Form.Keys.Contains("SaveAndReturn"))
                    return RedirectToRoute("Index");
                else
                    return RedirectToRoute("Edit", new { id = item.Id });
            }
            return Ok(model);
        }


        public async Task<IActionResult> Delete(int id)
        {
            var result = await _repository.RemoveAsync(id);
            if (result < 1)
            {
                if (TempData["Error"] != null)
                    TempData.Remove("Error");
                TempData.Add("Error", "");
            }
            return RedirectToAction("Index");
        }

    }
}