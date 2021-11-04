export function regularInputLink(count) {
  return `<div class="container d-flex form-group mb-4" id=regular-${count}>
    <div >   
      <button class="drag-btn">
        <i class="fas fa-ellipsis-v"></i>
      </button>
    </div>
    <div class="d-flex flex-column input-container p-3">
      <input class="form-control  mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">
      <input class="form-control  mb-3 tenpx" type="text" placeholder="Link">
      <div class="icon-container d-flex align-items-center">
        <div class="switch mr-3 mr-sm-4">
          <input type="checkbox" id="switch-1" /><label for="switch-1">Toggle</label>
        </div>
        <button class="mr-3 mr-sm-4"  data-toggle="modal" data-target="#deleteModal">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button class="mr-3 mr-sm-4">
          <i class="fas fa-image"></i>
        </button>
        <button class="mr-3 mr-sm-4 chart">
          <i class="fa fa-chart-bar" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>`;
}
