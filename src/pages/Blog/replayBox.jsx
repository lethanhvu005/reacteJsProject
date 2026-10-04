import React from "react";

const replayBox = () => {
  return (
    <div class="replay-box">
      <div class="row">
        <div class="col-sm-12">
          <h2>Leave a replay</h2>

          <div class="text-area">
            <div class="blank-arrow">
              <label>Your Name</label>
            </div>
            <span>*</span>
            <textarea name="message" rows="11"></textarea>
            <a class="btn btn-primary" href="">
              post comment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default replayBox;
