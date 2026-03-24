#include <iostream>
#include <vector>
#include <chrono>
#include <string>
#include "httplib.h"
#include "json.hpp" 

#include "search_algo.hpp"


using json= nlohmann::json;
int main() {
    const size_t SIZE =110000000;

    std::vector <size_t> data ; 
    data.reserve(SIZE);
    for ( size_t i=0; i<SIZE ; i++) data.push_back(i);

   httplib::Server svr ;

   svr.Get("/search", [&](const httplib::Request& req , httplib::Response& res) {
    long long target = 1099990 ; 
if (req.has_param("target")) {
    target = std::stoll (req.get_param_value ("target"));}
    std::string mode = req.get_param_value("mode");
    nlohmann:: json result ;
    result["linear_ms"] = 0.0;
    result["binary_ms"] = 0.0;

    auto startB = std::chrono::high_resolution_clock::now();
    bool foundL=linearSearch(data, (int)target);
    auto endB = std::chrono::high_resolution_clock::now();
result ["linear_ms"]= std::chrono::duration<double, std::micro>(endB- startB).count();
result["found"] = foundL ;

    auto startA = std::chrono::high_resolution_clock::now();
    result["found"]= binarySearch(data, (int)target);
    auto endA = std::chrono::high_resolution_clock::now();
    result["binary_ms"]=std::chrono::duration<double , std::micro> (endA-startA).count();  

          
        
        
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Content-Type", "application/json");
        res.set_content(result.dump(), "application/json");
        
        std::cout << "Processed search for: " << target << std::endl;
    });

    std::cout << "Server started at http://0.0.0.0:8080" << std::endl;
    svr.listen("0.0.0.0", 8080);

    return 0;
}

  