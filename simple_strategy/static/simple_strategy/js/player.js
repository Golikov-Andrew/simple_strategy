class Player{
    constructor(app, title, color, data){
        this.app = app;
        this.title = title;
        this.color = color;
        this.data = data;
        this.step_scores = 100;
        this.step_scores_max = 100;
        this.units = [];
        this.selected_units = []
    }
    add_unit(unit){
        this.units.push(unit)
    }
    toggle_unit_selection(unit){
        let idx = this.selected_units.indexOf(unit)
        if(idx!==-1){
            console.log('deselect')
            this.selected_units.splice(idx, 1)
        }else{
            console.log('select')
            this.selected_units.push(unit)
        }
    }
    deselect_all(){
        this.selected_units = []
        this.app.redraw()
    }
}

export{
    Player
}