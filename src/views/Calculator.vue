

<template>
  <div class="calculator">
    <hr>
    <h1>Calculator</h1>
    <hr>
    <h3>Type your:</h3>
      <div class="dropdown" v-if="options">

        <!-- Dropdown Input -->
        <label>State Initials: </label>
        <input class="dropdown-input"
          :name="name"
          @focus="showOptions()"
          @blur="exit()"
          @keyup="keyMonitor"
          v-model="searchFilter"
          :disabled="disabled"
          :placeholder="placeholder" />

        <!-- Dropdown Menu -->
        <div class="dropdown-content"
          v-show="optionsShown">
          <div
            class="dropdown-item"
            @mousedown="selectOption(option)"
            v-for="(option, index) in filteredOptions"
            :key="index">
              {{ option.name || option.id || '-' }}
          </div>
        </div>
      </div>
          <!-- <label>State Initials: </label>
          <input type="state" required> -->
    
    <form>
      <label>Length: </label>
      <input type="length" required>
    </form>
    <form>
      <label>Width: </label>
      <input type="width" required>
    </form>
    <form>
      <label>Height: </label>
      <input type="height" required>
    </form>
    <form>
      <label>Miles Traveling: </label>
      <input type="miles" required>
    </form>
    <button @click="calculate">Calculate</button>
    <h3>Costs:</h3>
    <p>
        State Permit Is: <br>
        State Other Permits Are:<br>
        Escort Cost Is:<br>
        Escort Miles Cost Is:<br>
        Pole Escort Cost Is:<br>
        Pole Escort Miles Cost Is:<br>
        Overnight Fee Is:<br>
        Police Escort Cost Is:<br>
        Police Escort Miles Cost Is:<br>
        Police Escort Hourly Cost Is:<br>
        Survey Cost Is:<br>
        Miles Cost Is:<br>
        Enginerring Cost Is:<br>
        Utility Cost Is:<br>
        Total Is:<br>
    </p>
  </div>
</template>

<script>
//import firebase from 'firebase';

export default {
  name: 'Dropdown',
    template: 'Dropdown',
    props: {
      name: {
        type: String,
        required: false,
        default: 'dropdown',
        note: 'Input name'
      },
      /*options: {
        type: Array,
        required: true,
        default: [],
        note: 'Options of dropdown. An array of options with id and name',
      },*/
      placeholder: {
        type: String,
        required: false,
        default: 'Please select an option',
        note: 'Placeholder of dropdown'
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
        note: 'Disable the dropdown'
      },
      maxItem: {
        type: Number,
        required: false,
        default: 1,
        note: 'Max items showing'
      }
    },
    data() {
      return {
        selected: { name: null, id: null},
        optionsShown: false,
        searchFilter: '',
        //statePermit: '',
         options: [
              { name: 'AL', id: 'al'},              
            ],
          }
    },
    created() {
      this.$emit('selected', this.selected);
    },
    computed: {
      filteredOptions() {
        const filtered = [];
        const regOption = new RegExp(this.searchFilter, 'ig');
        for (const option of this.options) {
          if (this.searchFilter.length < 1 || option.name.match(regOption)){
            if (filtered.length < this.maxItem) filtered.push(option);
          }
        }
        return filtered;
      },
      /*calculate() {
        if (this.options.name == 'AL')
        {
          if (value.weight > 80000.0 && value.weight <= 100000.0)
          {
            return 
          }
          
        }
      }*/
    },
    methods: {
      selectOption(option) {
        this.selected = option;
        this.optionsShown = false;
        this.searchFilter = this.selected.name;
        this.$emit('selected', this.selected);
      },
      showOptions(){
        if (!this.disabled) {
          this.searchFilter = '';
          this.optionsShown = true;
        }
      },
      exit() {
        if (!this.selected.id) {
          this.selected = {};
          this.searchFilter = '';
        } else {
          this.searchFilter = this.selected.name;
        }
        this.$emit('selected', this.selected);
        this.optionsShown = false;
      },
      // Selecting when pressing Enter
      keyMonitor: function(event) {
        if (event.key === "Enter" && this.filteredOptions[0])
          this.selectOption(this.filteredOptions[0]);
      }
    },
    watch: {
      searchFilter() {
        if (this.filteredOptions.length === 0) {
          this.selected = {};
        } else {
          this.selected = this.filteredOptions[0];
        }
        this.$emit('filter', this.searchFilter);
      }
    }
  };
</script>