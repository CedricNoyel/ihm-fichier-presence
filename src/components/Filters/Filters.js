import React from "react";
import { Radio, RadioGroup, FormControlLabel, Grid } from "@material-ui/core";

const Filters = (props) => {
  const filterList = props.filterList;
  const selectedFilter = props.selectedFilter;

  return (
    <Grid container alignItems="center">
      <Grid item xs={12} sm={2}>
        <h3>{"Groupes :"}</h3>
      </Grid>
      <Grid item xs={12} sm={10}>
        <RadioGroup
          row
          aria-label="group"
          name="group"
          value={selectedFilter}
          onChange={(e) => props.onChange(e.target.value)}
          style={{ width: "80%" }}
        >
          {filterList.map((e) => (
            <FormControlLabel
              value={e.filter}
              control={<Radio color="primary" />}
              label={e.filterName}
            />
          ))}
        </RadioGroup>
      </Grid>
    </Grid>
  );
};

export default Filters;
