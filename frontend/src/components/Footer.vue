<template>
    <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800 fixed bottom-0 left-0 w-full">
    
        <div class="container mx-auto p-4 flex justify-between items-center">
            <!-- First section-->
            <div class="flex-1 flex justify-left items-center">
                <strong>Developed by: </strong>
            <a href = "https://ze-ki.de/" class="no-underline"> 
                    <img src="../assets/zekilogopng.png" alt="ZEKI Logo" class="logo"></a>
            </div>

            <!-- Second section -->
            <div class="flex-1 flex justify-center items-center">
                <strong>In cooperation with: </strong>
                 <a href = "https://www.tu.berlin/"> 
                        <img src="../assets/logoTUB.png" alt="TUB Logo" class="logo1"></a>
                </div>
                
            <!-- Third section with links -->
            <div class="flex-1 flex justify-end items-center">
                <strong>Check out our: </strong>
                    <a href = "https://git.tu-berlin.de/ambient-assisted-living-wise23/kitchen-assistant/chefgpt/-/tree/main/frontend/src/components?ref_type=heads"> 
                        <img src="../assets/logogitlab.png" alt="Git Logo" class="logo2"></a>
                </div>
                
            </div>
        
    </footer>
</template>

<style>
footer a {
  text-decoration: none;
}
footer {
  
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: transparent !important;
    box-shadow:black !important;
}

.logo {
    max-width: 110px;
    max-height: 130px;
   
}

.logo1 {
    max-width: 100px;
    max-height: 60px;
   
}

.logo2 {
    max-width: 80px;
    max-height: 80px;
}
</style>
