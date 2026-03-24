#ifndef SEARCH_ALGO_HPP 
#define SEARCH_ALGO_HPP

#include <vector>

#include <algorithm>

int linearSearch ( const std::vector <size_t> &arr , int target ) {
    for ( size_t i =0 ; i<arr.size(); i++) {
        if (arr[i]==target) return i ; }  return -1; }

        int binarySearch (const std:: vector <size_t> &arr , size_t target) {
            long long left = 0 , right =arr.size()-1 ; 

            while ( left<=right) {
                long long mid = left + (right-left)/2 ; 
                if (arr[mid]== target ) return mid ;
                if (arr[mid]<target) left=mid+1 ; 
                else right = mid-1 ;}
                return -1 ; } 

                #endif