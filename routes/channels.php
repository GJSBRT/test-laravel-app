<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('counter', function () {
    return true;
});
